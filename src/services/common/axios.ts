import axios from "axios";

export interface Request {
  url: string;
  onSuccess(response: any): void;
  onError(error: any): void;
}
export interface PostRequest extends Request {
  data: any;
  isFileUpload?: boolean;
}

const client = axios.create({
  baseURL: 'https://8vg6jrtj0b.execute-api.ap-south-1.amazonaws.com/Prod',// process.env.REACT_APP_API_URL,
  responseType: "json",
});

export const Get = (req: Request) => {
  client
    .get(req.url)
    .then((response) => {
      req.onSuccess(response.data);
    })
    .catch((error) => {
      req.onError(error);
    });
};

export const Post = (req: PostRequest) => {
  if (req.isFileUpload) {
    client
      .post(req.url, req.data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        req.onSuccess(response.data);
      })
      .catch((error) => {
        req.onError(error);
      });
  } else {
    client
      .post(req.url, req.data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        req.onSuccess(response.data);
      })
      .catch((error) => {
        req.onError(error);
      });
  }
};

export const Update = (req: PostRequest) => {
  client
    .put(req.url, req.data)
    .then((response) => {
      req.onSuccess(response.data);
    })
    .catch((error) => {
      req.onError(error);
    });
};

export const Delete = (req: Request) => {
  client
    .delete(req.url)
    .then((response) => {
      req.onSuccess(response.data);
    })
    .catch((error) => {
      req.onError(error);
    });
};
