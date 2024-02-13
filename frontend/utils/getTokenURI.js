import { readContract } from '@wagmi/core';
import { ABI } from '@/constants/NFTCollection';
import { fetchMetadata } from './IPFS/fetchMetadata';
import axios from 'axios';

// gets URI for a token in a collection
export const getTokenURI = async (_contractAddr, _tokenID) => {
  try {
    const data = await readContract({
      address: _contractAddr,
      abi: ABI,
      functionName: 'tokenURI',
      args: [_tokenID],
    });

    // Extract CID from the URI
    const CID = data.split('ipfs://')[1];
    // Construct full IPFS gateway URL
    const IPFSurl = `https://ipfs.io/ipfs/${CID}`;

    const response = await axios.get(IPFSurl);
    console.log('GET METADATA🔥🔥🔥 ', response.data);
  } catch (err) {
    console.log('🔴 Error in getTokenURI: ', err.message);
  }
};
