import { json, Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../entity/user';
import {Auth} from '../entity/auth';
import { AppDataSource } from '../orm';
import FileService from '../image';
import PDFDoc from 'pdfkit';
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req: Request, res: Response): Promise<Response> => {
    const {username, password} = req.body;
    if (!username || !password) {
        throw new Error('Empty username or password');
    }
    let check = await AppDataSource.manager.findOneBy(Auth, {
        username: req.body.username
    });
    if (check) {
        throw new Error('User with this username already exist');
    }
    const hash = await bcrypt.hash(password, 5);
    const user = AppDataSource.manager.create(Auth, {
        username, 
        password: hash
    });

    return res.json(user);
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
      const user = await AppDataSource.manager.findOneBy(Auth, { username });
      if (!user) {
        throw new Error('User dont exist in Database');
      }
      const compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ username }, process.env.SECRET_KEY);

      return res.json({ token });
}

export const getAll = async (req:Request, res:Response): Promise<Response> => {
    const users = await AppDataSource.manager.find(User);
    if (!users) {
        throw new Error('No one user in Database');
    }

    return res.json(users);
}

export const createUser = async (req:Request, res:Response): Promise<Response> => {
    const {email, firstname, lastname} = req.body;
    const image = '';
    const user = AppDataSource.manager.create(User, {
        email,
        firstname,
        lastname,
        image,
    })
    AppDataSource.manager.save(User, user);

    return res.json(user);
}

export const image = async (req:Request, res: Response): Promise<Response> => {
    const file = FileService.save(req.files);
    const user = await AppDataSource.manager.findOneBy(User, {id: Number(req.params.id)});
    if (!user) {
        throw new Error('User not found in Database');
    }
    user.image = file;
    AppDataSource.manager.save(user);

    return res.json(file)
}

export const getOne = async (req:Request, res:Response): Promise<Response> => {

    const user = await AppDataSource.manager.findOneBy(User, {
        id: Number(req.params.id)
    });
    if (!user) {
        throw new Error('User not found in Database');
    }
    
    return res.json(user);
}

export const update = async (req:Request, res:Response): Promise<Response> => {
    const user = await AppDataSource.manager.findOneBy(User, {
        id: Number(req.params.id)
    });
    if(user){
        const {email, firstname, lastname, image} = req.body;
        AppDataSource.manager.update(User, req.params.id, {
            email, 
            firstname, 
            lastname, 
            image
        });
        const updatedUser = await AppDataSource.manager.save(user);
        return res.json(updatedUser);
    }
    
    return res.status(404).json({
        msg: 'User not found'
    })
}

export const deleteUser = async (req:Request, res:Response): Promise<Response> => {

    const deletedUser  = await AppDataSource.manager.delete(User, req.params.id);

    return res.json(deletedUser);
}

export const pdf = async (req: Request, res: Response): Promise<Response> => {
    let user: User;
    user = await AppDataSource.manager.findOneBy(User, {email : req.body.email})
    if (!user) { 
        throw new Error('Can not find such user');
    }
    const doc = new PDFDoc();
    doc.addPage().fontSize(15).text(user.firstname + user.lastname + user.image);
    const file = FileService.save(doc);
    let buf = Buffer.from(file);
    user.pdf = buf;
    AppDataSource.manager.save(user);
    if (user.pdf) {
        return res.json(true);
    }
    
    return res.json(false)
}
