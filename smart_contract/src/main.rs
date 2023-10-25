#![cfg_attr(not(feature = "library"), no_std)]

mod helpers; // Import the helpers module

use crate::helpers::{PROFILES_KEY, get_profiles, get_communities, get_posts, get_next_community_id, get_next_post_id};


use cosmwasm_std::{entry_point, Deps, DepsMut, Env, MessageInfo, Response, StdResult};
use schemas::JsonSchema;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Profile {
pub username: String,
pub user_address: String,
pub timestamp: u64,
pub bio: Option<String>,
pub metadata_uri: Option<String>,
pub communities: Vec<u32>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Community {
pub title: String,
pub description: String,
pub timestamp: u64,
pub creator: String,
pub community_id: u32,
pub members: Vec<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct CommunityPost {
pub creator: String,
pub title: String,
pub description: String,
pub timestamp: u64,
pub post_id: u32,
pub reactions: Vec<String>,
}

pub type PostId = u32;
pub type CommunityId = u32;
pub type UserAddress = String;

pub struct State {
pub posts: std::collections::HashMap<PostId, CommunityPost>,
pub communities: std::collections::HashMap<CommunityId, Community>,
pub profiles: std::collections::HashMap<UserAddress, Profile>,
pub post_counter: u32,
pub community_counter: u32,
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
deps: DepsMut,
_env: Env,
info: MessageInfo,
msg: ExecuteMsg,
) -> Result<Response, ContractError> {
// Implementation based on the type of ExecuteMsg received
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
CreateProfile { username: String },
CreateCommunity { title: String },
JoinCommunity { community_id: CommunityId },
CreateCommunityPost { community_id: CommunityId, title: String, description: String },
ReactToPost { post_id: PostId },
}

  // TRANSACTIONS/FUNCTIONS

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn create_profile(
deps: DepsMut,
env: Env,
info: MessageInfo,
username: String,
) -> Result<Response, ContractError> {
let sender = info.sender.clone();
let profiles = &mut get_profiles(deps.storage);
if profiles.contains_key(&sender) {
return Err(ContractError::InvalidInput("Profile already exists.".to_string()));
}
let new_profile = Profile {
    username,
    user_address: sender.clone(),
    timestamp: env.block.time,
    bio: None,
    metadata_uri: None,
    communities: vec![],
};

profiles.insert(sender, new_profile.clone());
Ok(Response::new())

}

// Implement the logic for the create_community function
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn create_community(
deps: DepsMut,
env: Env,
info: MessageInfo,
title: String,
) -> Result<Response, ContractError> {
let community_id = get_next_community_id(deps.storage);
let creator = info.sender.clone();
let new_community = Community {
title,
description: String::new(),
timestamp: env.block.time,
creator,
community_id,
members: vec![creator.clone()],
};

let communities = &mut get_communities(deps.storage);
communities.insert(community_id, new_community.clone());

Ok(Response::new())

}

// Implement the logic for the join_community function
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn join_community(
deps: DepsMut,
info: MessageInfo,
community_id: CommunityId,
) -> Result<Response, ContractError> {
let sender = info.sender;
let communities = &mut get_communities(deps.storage);

if let Some(community) = communities.get_mut(&community_id) {
    if !community.members.contains(&sender) {
        community.members.push(sender);
    } else {
        return Err(ContractError::InvalidInput("User is already a member of the community.".to_string()));
    }
} else {
    return Err(ContractError::InvalidInput("Community not found.".to_string()));
}

Ok(Response::new())

}

// Implement the logic for the create_community_post function
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn create_community_post(
deps: DepsMut,
env: Env,
info: MessageInfo,
community_id: CommunityId,
title: String,
description: String,
) -> Result<Response, ContractError> {
let post_id = get_next_post_id(deps.storage);
let creator = info.sender.clone();

let new_post = CommunityPost {
    creator,
    title,
    description,
    timestamp: env.block.time,
    post_id,
    reactions: vec![],
};

let posts = &mut get_posts(deps.storage);
posts.insert(post_id, new_post.clone());

Ok(Response::new())

}

// Implement the logic for the react_to_post function
#[cfg_attr(not(feature = "library"), entry_point)]
pub fn react_to_post(
deps: DepsMut,
info: MessageInfo,
post_id: PostId,
) -> Result<Response, ContractError> {
let sender = info.sender.clone();
let posts = &mut get_posts(deps.storage);

if let Some(post) = posts.get_mut(&post_id) {
    if !post.reactions.contains(&sender) {
        post.reactions.push(sender.clone());
    } else {
        return Err(ContractError::InvalidInput("User has already reacted to this post.".to_string()));
    }
} else {
    return Err(ContractError::InvalidInput("Post not found.".to_string()));
}

Ok(Response::new())

}

 