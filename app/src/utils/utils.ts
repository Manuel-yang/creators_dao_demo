import * as anchor from "@project-serum/anchor";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { Demo } from "../idl/demo";
import  ProgramIDL  from "../idl/demo.json"
import { Program } from "@project-serum/anchor";
import { getPostPda, getProfilePda } from "./pdas";

export function getProvider(wallet: AnchorWallet) {
  if (!wallet) {
    return null
  }
  const network = "https://api.devnet.solana.com"
  const connection = new Connection(network, "confirmed")
  const provider = new anchor.AnchorProvider(
    connection, wallet, {commitment:"confirmed"}
  );
  return provider

}

export function getProgram(provider: anchor.AnchorProvider) {
  const idl = JSON.parse(JSON.stringify(ProgramIDL))
  const programId = ProgramIDL.metadata.address;
  const program = new Program(
    idl,
    programId,
    provider
  ) as Program<Demo>
  return program
}

export async function createPostApi(wallet: AnchorWallet, input: string) {
  const provider = getProvider(wallet!)
  if (provider) {
    const program = getProgram(provider!)
    const profilePda = await getProfilePda(provider!.publicKey, program.programId)
    let postNonce
    try {
      postNonce = (await program.account.profilePda.fetch(profilePda[0])).postsNonce
    } catch(error: any) {
      postNonce = 0
    }
    const postPda = await getPostPda(Number(postNonce), program.programId)
    const tx = await program.methods
    .createPost(input)
    .accounts({
      payer: provider.publicKey,
      profilePda: profilePda[0],
      postPda: postPda[0],
      systemProgram: anchor.web3.SystemProgram.programId
    })
    .rpc()
    console.log(`create post tx is ===> ${tx}`)
    return postNonce
  }
}


export async function deletePostApi(wallet: AnchorWallet, postNonce: number) {
  const provider = getProvider(wallet!)
  if (provider) {
    const program = getProgram(provider!)
    const profilePda = await getProfilePda(provider!.publicKey, program.programId)
    const postPda = await getPostPda(postNonce, program.programId)
    console.log(postPda[0].toString())
    const tx = await program.methods
    .deletePost()
    .accounts({
      payer: provider.publicKey,
      profilePda: profilePda[0],
      postPda: postPda[0],
      systemProgram: anchor.web3.SystemProgram.programId
    })
    .rpc()
    console.log(`delete post tx is ===> ${tx}`)
    return postNonce
  }
}