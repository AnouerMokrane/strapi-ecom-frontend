export type IProduct = {
  id: number;
  attributes: {
    title: string;
    description: string;
    price: number;
    color: string;
    size: string;
    stock: number;
    images: {
      data: [{ id: number; attributes: { url: string } }];
    };
    colors: {
      data: [
        {
          id: number;
          attributes: {
            name: string;
          };
        }
      ];
    };
    sizes: {
      data: [
        {
          id: number;
          attributes: {
            name: string;
          };
        }
      ];
    };
  };
};

export type ICategory = {
  id: number;
  attributes: {
    title: string;
  };
};
export type IColor = {
  id: number;
  attributes: {
    name: string;
  };
};
export type ISize = {
  id: number;
  attributes: {
    name: string;
  };
};

export type CartItem = {
  id: number;
  quantity: number;
  size: string;
  color: string;
};

export type IUser = {
  username: string;
  email: string;
  password: string;
};

export type IWishlistItem = {
  id: number;
  attributes: {
    product: {
      data: IProduct;
    };
    createdAt: Date;
  };
};
