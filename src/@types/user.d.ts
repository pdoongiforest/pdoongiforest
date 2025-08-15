export default interface UserProfileProp {
  profileImage: string;
  nickName: string;
  status: '0' | '1' | '2' | '3' | null;
  profileId: string | null;
  role: string | null;
  age: number;
}
