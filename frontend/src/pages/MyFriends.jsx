import React from 'react'
import { useQuery,useQueryClient } from '@tanstack/react-query';
import { getUserFriends } from '../lib/api';
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
const MyFriends = () => {
    const queryClient = useQueryClient();
     const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  return (
    <div>
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
                     
                    </div>
             {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}
    </div>
  )
}

export default MyFriends
