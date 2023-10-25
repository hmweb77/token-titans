// helpers.rs

use cosmwasm_std::{StdResult, Storage};
use std::collections::HashMap;

pub const PROFILES_KEY: &[u8] = b"profiles";
pub const COMMUNITIES_KEY: &[u8] = b"communities";
pub const POSTS_KEY: &[u8] = b"posts";

   // HELPER FUNCTIONS - RETRIEVERS

// Helper function to get profiles from storage
fn get_profiles(storage: &dyn Storage) -> StdResult<HashMap<UserAddress, Profile>> {
    load(storage, PROFILES_KEY)
    }
    
    // Helper function to get communities from storage
    fn get_communities(storage: &dyn Storage) -> StdResult<HashMap<CommunityId, Community>> {
    load(storage, COMMUNITIES_KEY)
    }
    
    // Helper function to get posts from storage
    fn get_posts(storage: &dyn Storage) -> StdResult<HashMap<PostId, CommunityPost>> {
    load(storage, POSTS_KEY)
    }
    
    // Helper function to get the next community ID from storage
    fn get_next_community_id(storage: &dyn Storage) -> CommunityId {
    let mut state = State::load(storage).unwrap_or_default();
    state.community_counter += 1;
    State::save(storage, &state);
    state.community_counter
    }
    
    // Helper function to get the next post ID from storage
    fn get_next_post_id(storage: &dyn Storage) -> PostId {
    let mut state = State::load(storage).unwrap_or_default();
    state.post_counter += 1;
    State::save(storage, &state);
    state.post_counter
    }