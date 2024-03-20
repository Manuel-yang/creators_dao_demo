use anchor_lang::prelude::*;
#[account]
pub struct PostPda {
  // pub post_pda_address: Pubkey,
  pub post_nonce: u64,

  pub content: String,

  pub time_stamp: i64,

  pub bump: u8,

}

impl PostPda {
  pub fn init(post_nonce: u64, content: String, time_stamp: i64, bump: u8) -> Self {
    Self {
      post_nonce,
      content,
      time_stamp,
      bump
    }
  }
}