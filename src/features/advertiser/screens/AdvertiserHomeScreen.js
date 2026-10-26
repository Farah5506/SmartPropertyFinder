import ComingSoon from '../../../shared/components/ComingSoon';

export default function AdvertiserHomeScreen() {
  return (
    <ComingSoon
      title="Advertiser Home"
      links={[{ label: 'View a User', route: 'UserPublicProfile' }]}
    />
  );
}