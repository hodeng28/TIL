interface Avatar {
  idavatar: number;
  iduser: number;
  idavatarfolder: number;
  avatarname: string;
  imgpath: string;
  edit_date: string;
  usingnumber: number;
}

interface AvatarFolder {
  idavatarfolder: number;
  iduser: number;
  foldername: string;
  edit_date: string;
}
