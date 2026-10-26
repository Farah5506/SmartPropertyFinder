import ComingSoon from '../../../shared/components/ComingSoon';

export default function UserHomeScreen() {
  return (
    <ComingSoon
      title="User Home"
      links={[
        { label: 'Properties for Rent', route: 'RentListings' },
        { label: 'Properties for Buy', route: 'BuyListings' },
        { label: 'View an Advertiser', route: 'AdvertiserPublicProfile' },
      ]}
    />
  );
}