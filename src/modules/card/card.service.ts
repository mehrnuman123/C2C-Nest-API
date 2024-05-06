import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Card } from './card.entity';
import { CreateCardDto } from './dto/createCardDto';
import { CardType } from 'src/enums/card.enum';
import { PutCardForSale } from './dto/addCardToListingDto';

@Injectable()
export class CardService {
  @InjectRepository(Card)
  private readonly repository: Repository<Card>;

  public async create(body: CreateCardDto, id: number): Promise<Card | never> {
    const { serialNumber, category, balance, isListed, expiry, userId, type, isActive, pin, manufacturar, photoUrl }: CreateCardDto = body;

    let cardType: string;
    if (type === CardType.GIFTCARD) {
      cardType = CardType.GIFTCARD
    }
    if (type === CardType.ALLOWANCESLIP) {
      cardType = CardType.ALLOWANCESLIP
    }
    const card = new Card();
    card.serialNumber = serialNumber;
    card.balance = balance;
    card.userId = id ? id : userId;
    card.expiry = expiry;
    card.photo = photoUrl;
    card.category = category;
    card.pin = pin;
    card.type = cardType;
    card.isActive = isActive;
    card.isListed = isListed;
    card.manufacturer = manufacturar;
    return this.repository.save(card);
  }

  public async getAllCardsForCurrentUser(id: number): Promise<Card[] | undefined> {

    const cards = await this.repository.query(`
    select * 
    from public.card
    where user_id = ${id};
    `)
    return cards
  }
  public async checkIfCardExistsInWallet(serialNumber: string): Promise<Card | null> {
    return await this.repository.findOne({
      where: {
        serialNumber: serialNumber
      }
    })
  }
  public async getSingleCardDetails(id: number): Promise<Card | null> {
    return await this.repository.findOne({
      where: {
        id
      }
    })
  }

  public async deletSingleCard(id: number){
    return await this.repository.delete(id)
  }
  public async addCardToListing(id: number, body: PutCardForSale): Promise<Card | null> {
    const { sellingPrice, discount, youWillGet, master_commision, geotag } = body;
    const card = await this.repository.findOne({
      where: {
        id: id
      }
    })
    const expiry = new Date(card.expiry);
    const today = new Date();
    if (expiry < today) {
      console.log('true');
    }
    else {
      console.log('false');

    }
    console.log('card date', card.expiry);

    if (sellingPrice < card.balance && card.isListed === false && expiry > today) {
      console.log('inside');

      // const discountPercentage = ((card.balance - sellingPrice) / card.balance) * 100;
      // const fivePercent = (geotag / 100) * sellingPrice;
      // const you_will_get = sellingPrice - fivePercent;
      // console.log('discount', discountPercentage);
      // console.log(' 5 percent', fivePercent);
      // console.log('u wil get', you_will_get)
      // card.geotag = geotag;
      card.master_commision = master_commision;
      card.youWillGet = youWillGet;
      card.geotag = geotag;
      card.discount = discount;
      card.isListed = true;
      card.sellingPrice = sellingPrice;
      return this.repository.save(card)

    }



  }

  public async getAllListedCards(): Promise<Card[] | null> {
    const cards = await this.repository.find({ where: { isListed: true, isActive: true } })
    return cards

  }

  public async getAllCompaniesListedCards(): Promise<Card[] | null> {
    let cardsForEachCompany = []
    const companies = await this.repository.query(`
    select distinct manufacturer
    from public.card;
    `);

    for (let i = 0; i < companies?.length; i++) {
      const cards = await this.repository.find(({
        where: {
          manufacturer: companies[i]?.manufacturer
        },
        select: ['sellingPrice', 'category', 'discount', 'expiry', 'manufacturer', 'photo', 'type', 'id', 'userId'],
        order:{
          discount: 'DESC'
        }
      }))
      const obj = {
        companyName: companies[i]?.manufacturer,
        totalCount: cards?.length,
        cards: cards
      }
      cardsForEachCompany.push(obj)
    }

    return cardsForEachCompany;
  }

  public async getAllCardsWithOffer(): Promise<Card[] | null> {
    return await this.repository.find({
      where:{
        discount: MoreThan(0)
      },
      order: {
        discount: 'DESC'
      },
      select: ['sellingPrice', 'category', 'discount', 'expiry', 'manufacturer', 'photo', 'type', 'id', 'userId']

    })
  }

  public async  getAllListedCardsForSports(): Promise<Card[] | null> {
   return await this.repository.find({
    where:{
      category: 'sport'
    },
    select: ['sellingPrice', 'category', 'discount', 'expiry', 'manufacturer', 'photo', 'type', 'id', 'userId']
   }) 
  }

  public async  getAllListedCardsForHobby(): Promise<Card[] | null> {
    return await this.repository.find({
     where:{
       category: 'hobby'
     },
     select: ['sellingPrice', 'category', 'discount', 'expiry', 'manufacturer', 'photo', 'type', 'id', 'userId']
    }) 
   }
 

}