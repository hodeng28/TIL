import React from 'react';

const profileData = {
  hodeng: {
    name: 'Hoyoung',
    dscription: 'human'
  },
  homer: {
    name: '토르',
    description: '신',
  }
}
function Profile({ match }) {
  const { username } = match.params;
  return (
    <div>

    </div>
  );
};

export default Profile;