// helpers.rs

use cosmwasm_std::entry_point;
use cw_storage_plus::Map;
use cosmwasm_std::StdResult;
use cosmwasm_std::Storage;
use crate::CommunityId;
use crate::PostId;
use crate::Community;
use crate::CommunityPost;
use crate::Profile;
use crate::UserAddress;


pub const PROFILES_KEY: &[u8] = b"profiles";
pub const COMMUNITIES_KEY: &[u8] = b"communities";
pub const POSTS_KEY: &[u8] = b"posts";

   // HELPER FUNCTIONS - RETRIEVERS

// Helper function to get profiles from storage
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn get_profiles<String>(storage: &dyn Storage) -> <Map<UserAddress, Profile>> ::new<String>{
    Map::new(storage, PROFILES_KEY)
    }
    
    // Helper function to get communities from storage
    #[cfg_attr(not(feature = "library"), entry_point)]
pub fn get_communities<String>(storage: &dyn Storage) -> <Map<CommunityId, Community>> ::new<String>{
    Load(storage, COMMUNITIES_KEY)
    }
    
    // Helper function to get posts from storage
    #[cfg_attr(not(feature = "library"), entry_point)]
pub fn get_posts<String>(storage: &dyn Storage) -> <cw_storage_plus::Map<'_, u32, CommunityPost>> {
    Load(storage, POSTS_KEY)
    }
    
    // Helper function to get the next community ID from storage
    #[cfg_attr(not(feature = "library"), entry_point)]
pub fn get_next_community_id(storage: &dyn Storage) -> CommunityId {
    let mut state = state.load(storage).unwrap_or_default();
    state.community_counter += 1;
    state.save(storage, &state);
    state.community_counter
    }
    
    // Helper function to get the next post ID from storage
    #[cfg_attr(not(feature = "library"), entry_point)]
pub fn get_next_post_id(storage: &dyn Storage) -> PostId {
    let mut state = state.load(storage).unwrap_or_default();
    state.post_counter += 1;
    state.save(storage, &state);
    state.post_counter
    }