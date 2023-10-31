interface EmailAddress {
  email_address: string;
  id: string;
  object: string;
}

interface UserData {
  birthday: string;
  created_at: number;
  email_addresses: EmailAddress[];
  first_name: string;
  gender: string;
  id: string;
  last_name: string;
  profile_image_url: string;
  username: string | null;
  unsafe_metadata: {
    registry_office_id: string;
    role: string;
  };
  updated_at: number;
}

export interface CreateUserBody {
  data: UserData;
}
