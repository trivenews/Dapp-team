
//0x66863d08547012dc267d2f871b20f68110262f66  contract address on rinkeby
//deployed using remix 

contract Contract {
 string ipfsHash;
 
 function sendHash(string x) public {
   ipfsHash = x;
 }

 function getHash() public view returns (string x) {
   return ipfsHash;
 }
}