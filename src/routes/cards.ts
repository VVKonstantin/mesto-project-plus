import { Router } from 'express';
import {
  createCard, delCardById, dislikeCard, getCards, likeCard,
} from '../controllers/cards';
import {
  validCreateCard, validDelCardById, validDislikeCard, validLikeCard,
} from '../middlewares/validation';

const router = Router();

router.get('/', getCards);
router.delete('/:cardId', validDelCardById, delCardById);
router.post('/', validCreateCard, createCard);
router.put('/:cardId/likes', validLikeCard, likeCard);
router.delete('/:cardId/likes', validDislikeCard, dislikeCard);

export default router;
