import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import * as Actions from 'app/store/actions';
import clsx from 'clsx';
import FuseNavBadge from '../FuseNavBadge';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  item: (props) => ({
    height: 40,
    width: 'calc(100% - 16px)',
    borderRadius: '0 20px 20px 0',
    paddingRight: 12,
    paddingLeft: props.itemPadding > 80 ? 80 : props.itemPadding,
    '&.active': {
      backgroundColor: theme.palette.secondary.main,
      color: `${theme.palette.secondary.contrastText}!important`,
      pointerEvents: 'none',
      transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
      '& .list-item-text-primary': {
        color: 'inherit'
      },
      '& .list-item-icon': {
        color: 'inherit'
      }
    },
    '& .list-item-icon': {
      marginRight: 16
    },
    '& .list-item-text': {},
    color: theme.palette.text.primary,
    cursor: 'pointer',
    textDecoration: 'none!important'
  })
}));

function FuseNavVerticalItem(props) {
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);
  const dispatch = useDispatch();

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { item, nestedLevel } = props;
  const classes = useStyles({
    itemPadding: nestedLevel > 0 ? 40 + nestedLevel * 16 : 24
  });
  const { t } = useTranslation('navigation');

  const restrictedLinkIds = ['Showroom-Managment','Doctor-Management', 'user-management', 'emailTemplates', 'priceSetting', 'lens-price', 'contact-price', 'service-price', 'dicount-price', 'Terms-And-Conditions']

  const hasPermission = useMemo(
    () => (restrictedLinkIds.includes(item?.id) && userData?.userRole === 'staff') ? false : true,
    [userData, item.id, restrictedLinkIds]
  );

  if (!hasPermission) {
    return null;
  }

  return (
    <ListItem
      button
      component={NavLinkAdapter}
      to={item.url}
      activeClassName="active"
      className={clsx(classes.item, 'list-item')}
      onClick={(ev) => mdDown && dispatch(Actions.navbarCloseMobile())}
      exact={item.exact}>
      {item.icon && item.icon !== 'policy' && item.icon !== 'calculator' && (
        <Icon className="list-item-icon text-16 flex-shrink-0" color="action">
          {item.icon}
        </Icon>
      )}
      {item.icon === 'policy' && (
        <PolicyOutlinedIcon
          className="list-item-icon text-16 flex-shrink-0"
          color="action"
        />
      )}

      {item.icon === 'calculator' && (
        <img
        className="w-20 h-20 mr-10"
        src={`assets/images/logos/Calculator.png`}
        alt='Calculator'
      />
      )}

      <ListItemText
        className="list-item-text"
        primary={item.translate ? t(item.translate) : item.title}
        classes={{ primary: 'text-14 list-item-text-primary' }}
      />

      {item.badge && <FuseNavBadge badge={item.badge} />}
    </ListItem>
  );
}

FuseNavVerticalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string
  })
};

FuseNavVerticalItem.defaultProps = {};

const NavVerticalItem = withRouter(React.memo(FuseNavVerticalItem));

export default NavVerticalItem;
