export class Project {
  id: string;
  creator: {
    id: string,
    name: string,
    picture: string,
    role: string
  };
  name: string;
  description: string;
  collaborators: Array<any>;
  createdAt: string;
  updatedAt: string;
}


