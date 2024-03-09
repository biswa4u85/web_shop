import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { SignInDto, SignInResponseDto } from "../users/users.entity";

import { RepoHelpersService } from "../helpers/repo.helpers.service";
import { BcryptHelpersService } from '../helpers/bcrypt.helpers.service';
import { JwtHelpersService } from '../helpers/jwt.helpers.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: RepoHelpersService,
    private readonly bcrypt: BcryptHelpersService,
    private readonly jwt: JwtHelpersService,
  ) { }


  async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    const { email, password } = signInDto;
    const user: any = await this.repo.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User does not exist.');
    }

    if (!user.isEmailVerified) {
      throw new ConflictException('User email is not verified.');
    }

    const isPasswordMatch = await this.bcrypt.compareString(password, user.password);
    if (!isPasswordMatch) {
      throw new ConflictException('Invalid email or password.');
    }

    const tokenData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    }

    const token = await this.jwt.generateToken(tokenData, "1d")
    user['token'] = token
    delete user.password
    return user
  };


  // async signUp(signUpDto: SignUpDto, clientUrl: string): Promise<void> {
  //     const { name, email, password } = signUpDto;

  //     const user = await this.repo.getUserByEmail(email);
  //     if (user) {
  //         throw new ConflictException('User already exists.');
  //     }

  //     const hashedPassword = await this.bcrypt.hashString(password);
  //     if (!hashedPassword) {
  //         throw new BadRequestException('Password could not be hashed.');
  //     }

  //     let transaction = null;
  //     try {
  //         transaction = await this.txn.createTransaction();
  //         await transaction.startTransaction();

  //         const txnManager = transaction.transactionManager;

  //         const immigrantObj = {
  //             first_name: name,
  //             email: email,
  //         }
  //         const immigrant = await this.repo.createImmigrant(immigrantObj, txnManager);
  //         const userObj = {
  //             immigrant_id: immigrant.id,
  //             email: email,
  //             password: hashedPassword,
  //             name: name,
  //         }
  //         const user = await this.repo.createUser(userObj, txnManager);

  //         const token = await this.jwt.generateToken({
  //             userId: user.id,
  //         }, '3d');

  //         await this.sendgrid.sendEmailWithTemplate(
  //             email,
  //             'Activate Immproved - You are minutes away from changing your life!',
  //             process.env.SENDGRID_TEMPLATE_ID__ACTIVATION as string,
  //             {
  //                 recipientName: name,
  //                 redirectUrl: clientUrl + "/activate?act_token=" + token
  //             }
  //         )

  //         return await transaction.commitTransaction();
  //     } catch (error) {
  //         if (transaction) await transaction.rollbackTransaction();
  //         throw error;
  //     } finally {
  //         if (transaction) await transaction.releaseTransaction();
  //     }
  // };

  // async sendActivationEmail(email: string, clientUrl: string): Promise<void> {
  //     const user = await this.repo.getUserByEmail(email);
  //     if (!user) {
  //         throw new NotFoundException('User does not exist.');
  //     }

  //     const token = await this.jwt.generateToken({
  //         userId: user.id,
  //     }, '3d');

  //     await this.sendgrid.sendEmailWithTemplate(
  //         email,
  //         'Activate Immproved - You are minutes away from changing your life!',
  //         process.env.SENDGRID_TEMPLATE_ID__ACTIVATION as string,
  //         {
  //             recipientName: user.name,
  //             redirectUrl: clientUrl + "/activate?act_token=" + token
  //         }
  //     )
  // };

  // async activateAccount(userId: number): Promise<UsersEntity> {
  //     const user = await this.repo.getUserById(userId);
  //     if (!user) {
  //         throw new NotFoundException('User does not exist.');
  //     }

  //     if (user.is_email_verified) {
  //         throw new ConflictException('User account is already activated.');
  //     }

  //     return await this.usersRepository.save({ ...user, is_email_verified: true });
  // };

  // async sendPasswordResetEmail(email: string, clientUrl: string): Promise<void> {
  //     const user = await this.repo.getUserByEmail(email);
  //     if (!user) {
  //         throw new NotFoundException('User does not exist.');
  //     }

  //     const token = await this.jwt.generateToken({
  //         userId: user.id,
  //     }, '10m');

  //     await this.sendgrid.sendEmailWithTemplate(
  //         email,
  //         'Immproved - Reset your Password',
  //         process.env.SENDGRID_TEMPLATE_ID__RESET_PASSWORD as string,
  //         {
  //             recipientName: user.name,
  //             redirectUrl: clientUrl + "/reset-password?reset_token=" + token
  //         }
  //     )
  // };

  // async resetPassword(userId: number, newPassword: string): Promise<UsersEntity> {
  //     const user = await this.repo.getUserById(userId);
  //     if (!user) {
  //         throw new NotFoundException('User does not exist.');
  //     }

  //     const hashedPassword = await this.bcrypt.hashString(newPassword);
  //     if (!hashedPassword) {
  //         throw new BadRequestException('Password could not be hashed.');
  //     }

  //     return await this.usersRepository.save({ ...user, password: hashedPassword });
  // };


  // async refreshAuthToken(userId: number): Promise<SignInResponseDto> {
  //     const user = await this.repo.getUserById(userId);
  //     if (!user) {
  //         throw new NotFoundException('User does not exist.');
  //     }

  //     let instanceData = null;
  //     try {
  //         const api = `${process.env.QUESTIONNAIRE_SERVER_URL as string}/instances/status/${user.quest_instance_id}`;
  //         const response = await fetch(api);
  //         instanceData = await response.json();
  //     } catch (error) {
  //         throw new BadRequestException('Error fetching questionnaire instance data.');
  //     }

  //     if (!instanceData) {
  //         throw new BadRequestException('Error fetching questionnaire instance data.');
  //     }

  //     const auth_token = await this.jwt.generateToken({
  //         userId: user.id,
  //     }, '1d');

  //     return {
  //         authToken: auth_token,
  //         userId: user.id,
  //         name: user.name,
  //         spouseId: user.spouse_id,
  //         instanceId: instanceData.id,
  //         instanceToken: instanceData.instance_token,
  //         questionnaireId: instanceData.questionnaire_id,
  //         questionnaireDateStart: instanceData.date_start,
  //         questionnaireLastSectionId: instanceData.last_section_id,
  //         questionnaireLastPageId: instanceData.last_page_id,
  //         questionnaireStatus: instanceData.status,
  //     };
  // };
};