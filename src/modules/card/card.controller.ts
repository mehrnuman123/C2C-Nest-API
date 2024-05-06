import { ResponseUtil } from 'src/util/reponse-util';
import { Body, Controller, HttpStatus, Inject, Post, Req, Get, Res, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { CardService } from './card.service';
import { CODE, DESCRIPTION } from 'src/constants';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/createCardDto';
import { PutCardForSale } from './dto/addCardToListingDto';

@Controller('api/v1/card')
export class CardController {
  @Inject(CardService)
  private readonly cardService: CardService;
  @Inject(UsersService)
  private readonly userService: UsersService;

  @Post('/add-wallet')
  @UseGuards(JwtAuthGuard)
  private async AddCartToWallet(@Body() body: CreateCardDto, @Res() res, @Req() req) {
    try {
      const checkIfExist = await this.cardService.checkIfCardExistsInWallet(body.serialNumber)
      if (!checkIfExist && body.isActive === true) {
        const card = await this.cardService.create(body, req.user.id);
        const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.CARD_ADDED_TO_WALLET);
        return res.status(resObj.CODE).json({ response: resObj, data: card });
      }
      else {
        const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.CARD_ALREADY_EXISTS_IN_WALLET);
        return res.status(resObj.CODE).json({ response: resObj, data: checkIfExist });
      }
    } catch (e) {
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  private async getCurrentUserCards(@Res() res, @Req() req) {
    try {
      const cards: Card[] = await this.cardService.getAllCardsForCurrentUser(req.user.id);
      const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.CARD_LIST);
      return res.status(resObj.CODE).json({ response: resObj, data: cards });
    } catch (e) {
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  private async getSinlgeCardDetails(@Param('id') id: number, @Res() res, @Req() req) {
    if (isNaN(id)) {
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, DESCRIPTION.ID_IS_NOT_A_NUMBER);
      return res.status(resObj.CODE).json({ response: resObj });
    }
    try {
      const card = await this.cardService.getSingleCardDetails(id);
      const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.SINGLE_CARD_DETAILS);
      return res.status(resObj.CODE).json({ response: resObj, data: card });
    } catch (e) {
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  private async deleteSingleCardDetail(@Param('id') id: number, @Res() res, @Req() req) {
    if (isNaN(id)) {
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, DESCRIPTION.ID_IS_NOT_A_NUMBER);
      return res.status(resObj.CODE).json({ response: resObj });
    }
    try {
      const card = await this.cardService.deletSingleCard(id);
      const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.CARD_DELETED);
      return res.status(resObj.CODE).json({ response: resObj });
    } catch (e) {
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }
  @Put('/listing/:cardId')
  @UseGuards(JwtAuthGuard)
  private async addCardForListing(@Param('cardId') id: number, @Body() body: PutCardForSale,@Res() res, @Req() req) {
    if (isNaN(id)) {
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, DESCRIPTION.ID_IS_NOT_A_NUMBER);
      return res.status(resObj.CODE).json({ response: resObj });
    }
    try {
      const card = await this.cardService.addCardToListing(id, body);
      const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.CARD_ADDED_FOR_LISTING);
      return res.status(resObj.CODE).json({ response: resObj, data: card });
    } catch (e) {
      console.log(e);
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }

  @Get('/listed/companies')
  @UseGuards(JwtAuthGuard)
  private async getAllCompaniesListedCards(@Res() res) {
    try {
      const card: Card[] = await this.cardService.getAllCompaniesListedCards();
      const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.CARD_LISTED_COMPANIES);
      return res.status(resObj.CODE).json({ response: resObj, data: card });
    } catch (e) {
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }

  @Get('/listed/offers')
  @UseGuards(JwtAuthGuard)
  private async getAllCardsWithOffer(@Res() res) {
    try {
      const card: Card[] = await this.cardService.getAllCardsWithOffer();
      const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.CARD_LISTED_OFFERS);
      return res.status(resObj.CODE).json({ response: resObj, data: card });
    } catch (e) {
      console.log(e);
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }

  @Get('/listed/sports')
  @UseGuards(JwtAuthGuard)
  private async getAllListedCardsForSports(@Res() res) {
    try {
      const card: Card[] = await this.cardService.getAllListedCardsForSports();
      const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.CARD_LISTED_SPORT);
      return res.status(resObj.CODE).json({ response: resObj, data: card });
    } catch (e) {
      console.log(e);
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }

  @Get('/listed/hobby')
  @UseGuards(JwtAuthGuard)
  private async getAllListedCardsForHobby(@Res() res) {
    try {
      const card: Card[] = await this.cardService.getAllListedCardsForHobby();
      const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.CARD_LISTED_HOBBY);
      return res.status(resObj.CODE).json({ response: resObj, data: card });
    } catch (e) {
      console.log(e);
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }

  @Get('/listed/selling')
  @UseGuards(JwtAuthGuard)
  private async getAllListedCards(@Res() res) {
    try {
      const card: Card[] = await this.cardService.getAllListedCards();
      const resObj = new ResponseUtil(HttpStatus.OK, CODE.SUCCESS, DESCRIPTION.CARD_LISTED_IN_MARKET);
      return res.status(resObj.CODE).json({ response: resObj, data: card });
    } catch (e) {
      const resObj = new ResponseUtil(HttpStatus.INTERNAL_SERVER_ERROR, CODE.ERROR, CODE.SOMETHING_WENT_WRONG);
      return res.status(resObj.CODE).json({ response: resObj });
    }
  }
}
