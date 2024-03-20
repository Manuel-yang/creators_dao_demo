import { PublicKey } from "@solana/web3.js"
import * as anchor from "@project-serum/anchor";

export async function getProfilePda(userAddress: PublicKey, programId: PublicKey) {
  const data = (await anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("profile_pda"),
      userAddress.toBuffer(),
    ],
    programId
  ))
  return data
}

export async function getPostPda(num: number, programId: PublicKey) {
  const data = (await anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("post_pda"),
      new anchor.BN(num).toArrayLike(Buffer, "le", 8),
    ],
    programId
  ))
  return data
}

