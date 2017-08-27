var TruffleContract, HttpProvider, data, loan, web3Provider;

HttpProvider = require('./web3/HttpProvider');

if (typeof TruffleContract === "undefined" || TruffleContract === null) {
  TruffleContract = require('truffle-contract');
}

data = {
  "contract_name": "PromiseEthLoan",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "started",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "delinquent",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": false,
      "inputs": [],
      "name": "payPremium",
      "outputs": [],
      "payable": true,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "rate",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "lienOn",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "calcInterest",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "container",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "collateralAmount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "contractStart",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "debtor",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "paymentOverdue",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "amount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "nextPaymentDue",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": false,
      "inputs": [],
      "name": "startLien",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "currentTerm",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "periodLength",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "terms",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "creditor",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "paidBack",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "constant": true,
      "inputs": [],
      "name": "loanFinished",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "type": "function"
    }, {
      "inputs": [
        {
          "name": "_container",
          "type": "address"
        }, {
          "name": "_creditor",
          "type": "address"
        }, {
          "name": "_debtor",
          "type": "address"
        }, {
          "name": "_amount",
          "type": "uint256"
        }, {
          "name": "_terms",
          "type": "uint256"
        }, {
          "name": "_rate",
          "type": "uint256"
        }, {
          "name": "_periodLength",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "constructor"
    }
  ],
  "unlinked_binary": "0x6060604052341561000f57600080fd5b60405160e080610805833981016040528080519190602001805191906020018051919060200180519190602001805191906020018051919060200180519150505b600b8054600160a060020a03808a16600160a060020a031992831617909255600980548984166101000261010060a860020a0319909116179055600a80549288169290911691909117905560078490556001839055600282905560038190555b505050505050505b61073e806100c76000396000f3006060604052361561010f5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631f2698ab8114610114578063248b885a1461013b57806329c08ba2146101625780632c4e722e1461016c5780633c4753e31461019157806345b23e2e146101b857806390e534a7146101dd57806392d09ceb1461020c5780639aa13f04146102315780639cb64a2d14610256578063aa54959214610285578063aa8c217c146102ac578063b4198570146102d1578063c29306d3146102f6578063c48c73421461031d578063d2ca211514610342578063d502562514610367578063e36db7851461038c578063f3ae5db4146103bb578063feee5c49146103e0575b600080fd5b341561011f57600080fd5b610127610407565b604051901515815260200160405180910390f35b341561014657600080fd5b610127610410565b604051901515815260200160405180910390f35b61016a610433565b005b341561017757600080fd5b61017f61053c565b60405190815260200160405180910390f35b341561019c57600080fd5b610127610542565b604051901515815260200160405180910390f35b34156101c357600080fd5b61017f61054b565b60405190815260200160405180910390f35b34156101e857600080fd5b6101f0610576565b604051600160a060020a03909116815260200160405180910390f35b341561021757600080fd5b61017f610585565b60405190815260200160405180910390f35b341561023c57600080fd5b61017f61058b565b60405190815260200160405180910390f35b341561026157600080fd5b6101f0610591565b604051600160a060020a03909116815260200160405180910390f35b341561029057600080fd5b6101276105a0565b604051901515815260200160405180910390f35b34156102b757600080fd5b61017f6105c5565b60405190815260200160405180910390f35b34156102dc57600080fd5b61017f6105cb565b60405190815260200160405180910390f35b341561030157600080fd5b610127610601565b604051901515815260200160405180910390f35b341561032857600080fd5b61017f610692565b60405190815260200160405180910390f35b341561034d57600080fd5b61017f610698565b60405190815260200160405180910390f35b341561037257600080fd5b61017f61069e565b60405190815260200160405180910390f35b341561039757600080fd5b6101f06106a4565b604051600160a060020a03909116815260200160405180910390f35b34156103c657600080fd5b61017f6106b8565b60405190815260200160405180910390f35b34156103eb57600080fd5b6101276106be565b604051901515815260200160405180910390f35b60095460ff1681565b6000805460ff16151561042557506000610430565b61042d6105a0565b90505b90565b60008061043e61054b565b9150348290101561044b57fe5b81340390506007548111156104ea576000600755600160a060020a03331681156108fc0282604051600060405180830381858888f19350505050151561049057600080fd5b600954600754600160a060020a036101009092049190911690830180156108fc0290604051600060405180830381858888f1935050505015156104d257600080fd5b6006805460010190556000805460ff19169055610537565b600954600160a060020a03610100909104163480156108fc0290604051600060405180830381858888f19350505050151561052457600080fd5b6007805482900390556006805460010190555b5b5050565b60025481565b60005460ff1681565b60006301e133806127106002546007540281151561056557fe5b0481151561056f57fe5b0490505b90565b600b54600160a060020a031681565b60085481565b60055481565b600a54600160a060020a031681565b60006105aa6105cb565b4211156105b957506001610430565b506000610430565b5b90565b60075481565b6000806105f76105e86006546003546106c990919063ffffffff16565b6005549063ffffffff6106f816565b90508091505b5090565b600b5460009033600160a060020a0390811691161461061f57600080fd5b600754600160a060020a03301631101561063557fe5b60008054600160ff19909116179055600954600754610100909104600160a060020a0316906108fc81150290604051600060405180830381858888f19350505050151561068157600080fd5b5060016006819055426005555b5b90565b60065481565b60035481565b60015481565b6009546101009004600160a060020a031681565b60045481565b600154600654115b90565b60008282028315806106e557508284828115156106e257fe5b04145b15156106ed57fe5b8091505b5092915050565b6000828201838110156106ed57fe5b8091505b50929150505600a165627a7a72305820ad8eed32dba1a880ce276034b7d67f6a64dc24411a75e8a97d14f9a4f07dbb090029",
  "networks": {},
  "schema_version": "0.0.5",
  "updated_at": 1503785472650
};

web3Provider = new HttpProvider('https://ropsten.infura.io/IchlJ2mE8C5P5Ls6ckxq');

loan = TruffleContract(data);

loan.setProvider(web3Provider);

loan = loan.at("0xda1dec4d71d4b584bb0106a1e98506c40e2a6f01");


function getEther(callback){
  var next = new Date()
  var inter = 1

  loan.nextPaymentDue().then(function(nextPaymentDue) {
    if(nextPaymentDue && typeof nextPaymentDue !== 'undefined'){
      next =  new Date(nextPaymentDue * 1000);    
    }
    console.log('NEXT PAYMENT DUE CALCULATING: ', next)
    return loan.calcInterest().then(function(interest) {
      if(interest && typeof interest !== 'undefined'){
        inter = (interest.toNumber() * 2678400 / 1000000000000000000)    
      }
      console.log('CALC INTEREST CALCULATING: ', inter)
 
      var normalize = Math.round(inter * 600 * 100)/100
      var human = next.toDateString()

      var final = 'You have one outstanding loan, with an interest payment of '+normalize+' dollars, due on '+human+'.'

      if(callback){
        return callback({
          nextPaymentDue: next,
          interest: inter,
          human: human,
          normalize: normalize,
          final: final
        })
      }

    }).catch(function (e) {
     console.log("Promise Rejected 1");
     console.log(e)
    });
  }).catch(function (e) {
   console.log("Promise Rejected 2");
   console.log(e)
  });
}

module.exports = getEther