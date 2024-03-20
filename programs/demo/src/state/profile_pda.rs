use anchor_lang::prelude::*;
#[account]
pub struct ProfilePda {
  pub user_address: Pubkey,

  pub posts_nonce: u64,

  pub bump: u8,
}


impl ProfilePda {
  pub fn init( user_address: Pubkey, posts_nonce: u64, bump: u8,) -> Self {
    Self {
      user_address,
      posts_nonce,
      bump
    }
  }

  pub fn increase_posts_num(&mut self) -> Result<()> {
    self.posts_nonce = self
      .posts_nonce
      .checked_add(1)
      .unwrap();
    Ok(())
}

}