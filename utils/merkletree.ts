import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";

const addresses = [
	"0x631046bc261e0b2e3db480b87d2b7033d9720c90",
	"0xad6561e9e306c923512b4ea7af902994bebd99b8",
	"0x127309CeBaA72cb97AD6623379a0cBf4fa8F5a94",
	"0x032180b003b74BF72B983544543Ce86799d9a634",
	"0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
	"0xCF193782f2eBC069ae05eC0Ef955E4B042D000Dd",
];

export const generateMerkleTree = () => {
	const hashedAddresses = addresses.map((address) => keccak256(address));
	const merkleTree = new MerkleTree(hashedAddresses, keccak256, {
		sortPairs: true,
	});
	const rootHash = "0x" + merkleTree.getRoot().toString("hex");

	return { merkleTree, rootHash };
};

export const verifyWeb = (address: string) => {
	const { merkleTree, rootHash } = generateMerkleTree();
	let hashedAddress = keccak256(address);
	let proof = merkleTree.getHexProof(hashedAddress);

	// Check proof
	let v = merkleTree.verify(proof, hashedAddress, rootHash);

	console.log(v); // returns true
	return {
		isPresent: v,
		proof
	}
};
