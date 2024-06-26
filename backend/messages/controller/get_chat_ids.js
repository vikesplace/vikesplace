import axios from 'axios';

export const getChatIds = async (req, res) => {
    try {
        const user_id = res.locals.decodedToken.user_id;
        const response = await axios.get(`/chats`, {
            params: { user_id: user_id },
          });
          if (response.status == 200) {
            res.json(response.data);
          } else {
            res.json(response.data);
          }
    } catch (err) {
        console.log(err);
    }
}