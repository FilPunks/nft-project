// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract fil_punks is ERC721A, Ownable {
    bool public saleIsActive = false;
    uint256 MAX_MINTS = 3;
    uint256 MAX_SUPPLY = 10000;
    uint256 RESERVE = 550;
    uint256 public mintRate = 1.99 ether;

    string public baseURI = "ipfs://bafybeiavla32nuk7u4hywps7uadx2rkzp2letw5ank3tkiyfzui2todjci/";

    constructor() ERC721A("fil punks", "FPK") {}

    function mint(uint256 quantity) external payable {
        require(saleIsActive, "Sale hasn't been activated");
        require(quantity + _numberMinted(msg.sender) <= MAX_MINTS, "Exceeded the limit");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Not enough FPK tokens left");
        require(msg.value >= (mintRate * quantity), "Not enough fil sent");
        _safeMint(msg.sender, quantity);
    }

    function reserve() public onlyOwner {
        _safeMint(msg.sender, RESERVE);
    }

    function setSaleState(bool newState) public onlyOwner {
        saleIsActive = newState;
    }

    function withdraw() external payable onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setMintRate(uint256 _mintRate) public onlyOwner {
        mintRate = _mintRate;
    }
}