// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ERPCore {
    function mintReward(address to, bytes32[] memory vouchers) external;
}

contract Web3RPCore is ERC1155, Ownable {

    event ItemCreated(uint256 indexed tokenId, string uri); 
    event PurchaseOrder(string proof);
    event InvoiceOrder(string uri);

    ERPCore public factory;

    uint256 public itemsLength;
    uint256 public purchaseLength;
    uint256 public invoiceLength;
    mapping(uint256 => string) private _uris;

    // RECIPES ARRAYS
    mapping(uint256 => uint256) private recipeInputLength;        // Size of items 
    mapping(uint256 => uint256[]) private recipeInputTokenIds;    // TokenIDs to be deducted
    mapping(uint256 => uint256[]) private recipeInputAmounts;     // Recipt Token amounts to deduct

    constructor(address _factory) ERC1155("") Ownable() {
        factory = ERPCore(_factory);
    }

    function uri(uint256 _uri) public view virtual override returns (string memory) {
        return _uris[_uri];
    }

    function createItem(
        uint256[] calldata _tokenIds,
        uint256[] calldata _tokenAmounts,
        string calldata _uri
    ) external onlyOwner  {
        require(_tokenAmounts.length == _tokenIds.length, "TokenIds and amounts array should be same size.");
        recipeInputLength[itemsLength] = _tokenIds.length;
        recipeInputTokenIds[itemsLength] = _tokenIds;
        recipeInputAmounts[itemsLength] = _tokenAmounts;
        _uris[itemsLength] = _uri;
        emit ItemCreated(itemsLength, _uri);
        itemsLength++;
    }

    function mintBatchInventory(
        uint256[] calldata _tokenIds,
        uint256[] calldata _tokenAmounts
    ) public onlyOwner {
        require(_tokenAmounts.length == _tokenIds.length, "TokenIds and Amounts array should be same size.");
        uint256 itemsSize = _tokenIds.length;
        for (uint256 id = 0; id < itemsSize; id++) {
            uint256 recipeLength = recipeInputLength[_tokenIds[id]];
            for (uint256 deductId = 0; deductId < recipeLength; deductId++) {
                _burnBatch(address(this), recipeInputTokenIds[deductId], recipeInputAmounts[deductId]);
            }
        }
        _mintBatch(address(this), _tokenIds, _tokenAmounts, "");
    }

    function burnBatchInventory(
        uint256[] calldata _tokenIds,
        uint256[] calldata _tokenAmounts
    ) public onlyOwner{
        require(_tokenAmounts.length == _tokenIds.length, "TokenIds and Amounts array should be same size.");
        _burnBatch(address(this), _tokenIds, _tokenAmounts);
    }

    function generatePurchaseOrder(
        uint256[] calldata _tokenIds,
        uint256[] calldata _tokenAmounts,
        string memory _proof
    ) public {
        require(_tokenAmounts.length == _tokenIds.length, "TokenIds and Amounts array should be same size.");
        _mintBatch(address(this), _tokenIds, _tokenAmounts, "");
        emit PurchaseOrder(_proof);
    }

    function generateInvoice(
        uint256[] calldata _tokenIds,
        uint256[] calldata _tokenAmounts,
        string calldata _uri
    ) public {
        require(_tokenAmounts.length == _tokenIds.length, "TokenIds and Amounts array should be same size.");
        _burnBatch(address(this), _tokenIds, _tokenAmounts);
        emit InvoiceOrder(_uri);
        bytes32 uniqueVoucher = 0x0000000000000000000000000000000000000000000000000000000000000000;
        bytes32[] memory vouchers = new bytes32[](1);
        uint256 idsLength = _tokenAmounts.length;
        for(uint256 i=0; i<idsLength; i++){
            vouchers[i] = uniqueVoucher;
        }
        factory.mintReward(msg.sender, vouchers);
    }

}