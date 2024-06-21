import { Request, Response, NextFunction } from "express";

const controller = {

    async getVideos (req: Request, res: Response, next: NextFunction) {
        console.log('--------IN GET V CONTROLLER--------')
        const { user_id } = req.params;
        // console.log(req.params)
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
              // console.log(data, 'line 21')
              res.locals.videos = data;
              return next();
    
        } catch {
            return next({
                err: "error in getVideo controller"
            })
        }
    },

    async postVideo (req: Request, res: Response, next: NextFunction) {
        console.log('--------IN PV CONTROLLER--------')
        const { user_id, title, description, video_url} = req.body;
        // console.log(req.body)
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
      console.log('--------IN GET Comments CONTROLLER--------')
      const { id } = req.params;
      console.log(req.params)
      try {
          const response = await fetch(
              `https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=${id}`,
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await response.json();
            console.log(data, 'line 75')
            res.locals.comments = data;
            return next();
  
      } catch {
          return next({
              err: "error in getVideo controller"
          })
      }
  },

  async postComment (req: Request, res: Response, next: NextFunction) {
    console.log('--------IN P COmment CONTROLLER--------')
    const { video_id, content, user_id } = req.body;
    // console.log(req.body)
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

};






export default controller;


