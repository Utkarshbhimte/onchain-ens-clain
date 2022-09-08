import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";

const addresses = [
    "0x631046bc261e0b2e3db480b87d2b7033d9720c90",
    "0xbc7b5142e390bbaabf8826dae7e1ef9c609df327",
    "0x16d9552e8275d51b74ad06e57f6c5007c4927e11",
    "0xefea36cc43918b1680f0c41744ba110157ecf35d",
    "0xadf0b74433149af075fb131b997c1386ea0d10ef",
    "0xdacf6a27d1a1d3a3809e0bf3849878e9b3457836",
    "0x7f5d87dea170227d0623d1e3a298364357637e6e",
    "0xab14023979a34b4abb17abd099a1de1dc452011a",
    "0x0e9326275819ef55125e59a96f8c09808fd015b8",
    "0xad6561e9e306c923512b4ea7af902994bebd99b8",
    "0xab14023979a34b4abb17abd099a1de1dc452011a", // same as gayatri's. Akhil owns her address as well
    "0x652b97bb2980cfff724ff9128b58da51dafe26be",
    "0xebb1dfb2b76d9d4e15206bb92f95b2504774ab97",
    "0x47a1b20046553453d938e51c4ab4141de71c2fe9",
    "0x70e12e1130758b4db23dc5fbd352a780b5b01171",
    "0xd0d25c51aC93a0bF435dd62A416737bA2605AA42",
    "0x9BC892bd29C12C20430d6B59273De5bC428Ee8B5",
    "0x55c484e7e1769e55b965c971de37dcf1e5582df2",
    "0x50fd325ff884eb1a0c4bcfeaf0b7f19930aafde3",
    "0x30fbfadd4fac4e315ad2057ba7bf7d6dc72ae805",
    "0x1e4ab43d5d283cb3bf809a46c4eed47c7283e6ec",
    "0x9c9628746c10052870a6a1A9C39298c24E6B442E",
    "0x9b64c71f9fb4b5afa1fd324c5848d80631ee9aff",
	"0xCF193782f2eBC069ae05eC0Ef955E4B042D000Dd"
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
