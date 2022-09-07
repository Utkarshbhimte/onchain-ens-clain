import { verifyWeb } from "@/utils/merkletree";
import { useEffect, useState } from "react";

const useWhiteList = (address?: string) => {
    const [onWhiteList, setOnWhiteList] = useState(false);
    const [proof, setProof] = useState<string[]>([]);

    useEffect(() => {
        if(!address?.length) return;
        const { isPresent, proof } = verifyWeb(address);
        setProof(proof);
        setOnWhiteList(isPresent);
    }, [address]);

    return {
        onWhiteList,
        proof
    }
}

export default useWhiteList;
