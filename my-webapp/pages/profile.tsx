import React from 'react'

import ProfileSection from "../components/Profile/ProfileSection"
import BadgetsSection from 'components/Badge/BadgetsSection'
import ActivitiesSection from 'components/ActivitiesSection'

function Profile() {
    return (
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <ProfileSection />
        <BadgetsSection />
        <ActivitiesSection />
      </div>
    );
};

export default Profile;