import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

export default function GroupAvatars() {
  return (
    <AvatarGroup max={3}>
      <Avatar alt="Remy Sharp" src="/material-ui-static/images/avatar/1.jpg" />
      <Avatar alt="Travis Howard" src="/material-ui-static/images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="/material-ui-static/images/avatar/3.jpg" />
      <Avatar alt="Cindy Baker" src="/material-ui-static/images/avatar/3.jpg" />
    </AvatarGroup>
  );
}
