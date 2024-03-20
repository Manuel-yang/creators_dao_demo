use anchor_lang::prelude::*;
use anchor_lang::error_code;
use crate::state::{PostPda, ProfilePda};

pub fn delete_post(ctx: Context<DeletePost>) -> Result<()> {
  require!(ctx.accounts.profile_pda.user_address.key() == ctx.accounts.payer.key(), ErrorCode::InvalidUser);
  Ok(())
}


#[derive(Accounts)]
pub struct DeletePost<'info> {
    #[account(mut)]
    payer: Signer<'info>,

    profile_pda: Account<'info, ProfilePda>,

    #[account(
        mut,
        close = payer
    )]
    pub post_pda: Account<'info, PostPda>,

    pub system_program: Program<'info, System>,
}

#[error_code]
pub enum ErrorCode {
  #[msg("invalid user")]
  InvalidUser,
}
