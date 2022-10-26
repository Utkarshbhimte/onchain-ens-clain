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
	"0xCF193782f2eBC069ae05eC0Ef955E4B042D000Dd",
	"0xfd8b8E92ebc0D393e50e5e73C6126a1bF0289FEc",
	"0x31dda005e0ec83c19bdb95979876c70a299a8600",
	"0xF3aDeed69bCd751b6D3518874a25B3324c432228",
	"0x567432D65B1Ab2f3Bf118d9Ab02A7b63beD31dB9",
	"0xa0a112f44b44d49C8401cc7f223566187cAcd2E4",
	"0x6f31BdBDb90F175Cad50Bc771803dCB47cD3657a",
	"0xC1d9dD2ea13984ef0E6223081F6DdEA90C4f0d45",
	"0x963d1821b0C1cA2787F9E273dF1e501007e74A47",
	"0x663e5582a647b3b6fb351ee43b3f8213cb5d6532",
	"0x29b82b938F7741C69Eb33858767877900dDb7C1c",
	"0x0652c90a781070e9893af282b0769a2bbf2972be",
	"0x42b26d5f4915150011c171455b91628500f42122",
	"0x91a066583e147a0a06498c600d89891888abf205",
	"0x127ec85a09dc8e1f2e0693c42123e325a491afe6",
	"0x1c55272887e4811d5283Ca573ad24E78df3CCEc7",
	"0xb5cbfad0f89c7f62661cea780c13dca5ba4f6d1d",
	"0xbfeB28120081e0A3f887FF601D44c4Fb3d08C1bf",
	"0x4B38DA2D840FD91aff7019ea94692BE78233349b",
	"0x7f5d87dea170227d0623d1e3a298364357637e6e",
	"0xbE84e8BF651F979AD066563dcFF50E4a64fB70F1",
	"0x4cd9d7A6282e4e4A12ca9c4c7F5F7321ab9ed440",
	"0xB130bA85de2CA2102cAcD23F534dEB38ADddD104",
	"0x8D77a108D6eB5a854601778E2a3BEb8801eAacBf",
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

	console.log({ rootHash });

	let hashedAddress = keccak256(address);
	let proof = merkleTree.getHexProof(hashedAddress);

	// Check proof
	let v = merkleTree.verify(proof, hashedAddress, rootHash);

	return {
		isPresent: v,
		proof,
	};
};
