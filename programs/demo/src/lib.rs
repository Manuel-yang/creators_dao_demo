use anchor_lang::prelude::*;
use instructions::*;

pub mod instructions;
pub mod state;


declare_id!("9oJDq3FPjoH72bvqKkyfNyoHCyZPeraMtQxZjKGRjJtY");

#[program]
pub mod demo {
    use super::*;

    pub fn create_post(ctx: Context<CreatePost>, content: String) -> Result<()> {
        instructions::create_post(ctx, content)
    }

    pub fn delete_post(ctx: Context<DeletePost>) -> Result<()> {
        instructions::delete_post(ctx)
    }
}

#[derive(Accounts)]
pub struct Initialize {}
