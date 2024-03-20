use anchor_lang::prelude::*;

use crate::state::{PostPda, ProfilePda};

pub fn create_post(ctx: Context<CreatePost>, content: String) -> Result<()> {
  if &ctx.accounts.profile_pda.user_address.to_string() == "11111111111111111111111111111111" {
    let profile_pda = &mut ctx.accounts.profile_pda;
    let  profile_pda_bumps = *ctx.bumps.get("profile_pda").unwrap();
    **profile_pda = ProfilePda::init(ctx.accounts.payer.key(), 0, profile_pda_bumps)
  }
  let now_ts = Clock::get().unwrap().unix_timestamp;
  let post_pda = &mut ctx.accounts.post_pda;
  let  post_pda_bumps = *ctx.bumps.get("post_pda").unwrap();
  **post_pda = PostPda::init(ctx.accounts.profile_pda.posts_nonce, content, now_ts, post_pda_bumps);
  let _ = ctx.accounts.profile_pda.increase_posts_num();
  msg!(&ctx.accounts.profile_pda.user_address.to_string());
  Ok(())
}


#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(mut)]
    payer: Signer<'info>,

    #[account(
      init_if_needed,
      payer = payer,
      space = 128,
      seeds = [
        b"profile_pda",
        payer.key().as_ref(),
      ],
      bump
    )]
    profile_pda: Account<'info, ProfilePda>,

    #[account(
        init_if_needed,
        payer = payer,
        space = 4000,
        seeds = [b"post_pda", &profile_pda.posts_nonce.to_le_bytes()],
        bump
    )]
    pub post_pda: Account<'info, PostPda>,

    pub system_program: Program<'info, System>,
}