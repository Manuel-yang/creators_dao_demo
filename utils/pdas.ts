import { BN } from "@coral-xyz/anchor"
import { PublicKey } from "@solana/web3.js"
import * as anchor from "@coral-xyz/anchor";


export const getProfilePda = async (
  userAddress: PublicKey,
  programId: PublicKey
) => {
  const data = (await anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("profile_pda"),
      userAddress.toBuffer(),
    ],
    programId
  ))
  return data
}

export const getPostPda = async (
  num,
  programId: PublicKey
) => {
  const data = (await anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("post_pda"),
      new BN(num).toArrayLike(Buffer, "le", 8),
    ],
    programId
  ))
  return data
}
