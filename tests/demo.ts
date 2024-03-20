import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Demo } from "../target/types/demo";
import { getPostPda, getProfilePda } from "../utils/pdas";

describe("demo", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider()

  const program = anchor.workspace.Demo as Program<Demo>;

  it("create a post", async () => {
    const profilePda = await getProfilePda(provider.publicKey, program.programId)
    const postNonce = (await program.account.profilePda.fetch(profilePda[0])).postsNonce
    const postPda = await getPostPda(postNonce, program.programId)

    const tx = await program.methods
      .createPost("test")
      .accounts({
        payer: provider.publicKey,
        profilePda: profilePda[0],
        postPda: postPda[0],
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .rpc()
  });

  it("delete a post", async () => {
    const profilePda = await getProfilePda(provider.publicKey, program.programId)
    const postNonce = (await program.account.profilePda.fetch(profilePda[0])).postsNonce
    const postPda = await getPostPda(Number(postNonce)-1, program.programId)
    const tx = await program.methods
      .deletePost()
      .accounts({
        payer: provider.publicKey,
        profilePda: profilePda[0],
        postPda: postPda[0],
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .rpc()
  })
});
