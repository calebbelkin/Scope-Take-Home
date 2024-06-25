import { Request, Response, NextFunction } from "express";

const controller = {

    async getVideos (req: Request, res: Response, next: NextFunction) {
        const { user_id } = req.params;
        try {
            const response = await fetch(
                `https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=${user_id}`,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
              );
              const data = await response.json();
              res.locals.videos = data;
              return next();
    
        } catch {
            return next({
                err: "error in getVideo controller"
            })
        }
    },

    async postVideo (req: Request, res: Response, next: NextFunction) {
        const { user_id, title, description, video_url} = req.body;
        try {
            const response = await fetch(
                "https://take-home-assessment-423502.uc.r.appspot.com/api/videos",
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ user_id, video_url, title, description }),
                }
              );
              const data = await response.json();
              res.locals.response = data;
              return next();
    
        } catch {
            return next({
                err: "error in postVideo controller"
            })
        }
    },

    async getComments (req: Request, res: Response, next: NextFunction) {
      const { video_id } = req.params;
      try {
          const response = await fetch(
              `https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=${video_id}`,
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await response.json();
            res.locals.comments = data;
            return next();
  
      } catch {
          return next({
              err: "error in get Comments controller"
          })
      }
  },

  async postComment (req: Request, res: Response, next: NextFunction) {
    const { video_id, content, user_id } = req.body;
    try {
        const response = await fetch(
            "https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments",
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ video_id, content, user_id }),
            }
          );
          const data = await response.json();
          res.locals.response = data;
          return next();

    } catch {
        return next({
            err: "error in post Comment controller"
        })
    }
},

async editVideo (req: Request, res: Response, next: NextFunction) {
  const { user_id, video_url, video_id, title, description } = req.body;
  try {
      const response = await fetch(
          "https://take-home-assessment-423502.uc.r.appspot.com/api/videos",
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({user_id, video_url, video_id, title, description}),
          }
        );
        const data = await response.json();
        res.locals.response = data;
        return next();

  } catch {
      return next({
          err: "error in edit Video controller"
      })
  }
},

};






export default controller;


