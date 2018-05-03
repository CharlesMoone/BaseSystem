import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { secret } from '../utils/secret';
import onlineModel from '../model/onlineModel';


const verifySecert = promisify(jwt.verify);


export default class JwtHandle {
  // 设置登录持续时间为4小时
  static expiresIn = 14400;

  static getTime() {
    return new Date().getTime();
  }

  // expire time: 3600s - 1h
  static tokenSign(data, { ...baseInfo }, expiresIn=this.expiresIn) {
    return jwt.sign({
      ...data,
    }, secret, {
      expiresIn,
    });
  }

  static async registerToken(data, { ...baseInfo }, expiresIn=this.expiresIn) {
    let token = '';

    try {
      await onlineModel.update({ name: baseInfo.name, legal: true }, { $set: { legal: false, removeTime: this.getTime() } }, { multi: true });
      token = this.tokenSign(data, { ...baseInfo }, expiresIn);
      await new onlineModel({ ...baseInfo, token, createTime: this.getTime(), legal: true }).save();
    } catch (err) {
      console.error(err);
    }

    return token;
  }

  static async refreshToken(data, { ...baseInfo }, expiresIn=this.expiresIn) {
    let token = '';

    try {
      const userOnline = await onlineModel.find({ name: baseInfo.name, legal: true }).exec();
      const onlineLength = userOnline ? userOnline.length : 0;

      if (onlineLength !== 1) throw 'lengthMore';

      const userNow = userOnline[0];

      // if ((this.getTime() - userNow.createTime - this.expiresIn*1000) < 0) {
      //   token = this.tokenSign(data, { ...baseInfo }, expiresIn);
      //   await onlineModel.findOneAndUpdate({ name: baseInfo.name, legal: true }, { $set: { token, updateTime: this.getTime() }});
      // } else {
      //   token = userNow.token;
      // }

      token = userNow.token;
    } catch (err) {
      switch (err) {
        case 'lengthMore':
          token = await this.registerToken(data, { ...baseInfo }, expiresIn);
          break;
        default:
          console.log(err);
      }
    }

    return token;
  }

  static async verify(token) {
    const pureToken = token.split(' ')[1];
    let payload;
    let userNow;

    try {
      userNow = await onlineModel.findOne({ token: pureToken }).exec();

      if (!userNow.legal) return false;

      payload = await verifySecert(token.split(' ')[1], secret);

      return payload;
    } catch (err) {
      if (!!userNow) {
        if ((this.getTime() - userNow.createTime - this.expiresIn*1000) > 0) {
          console.log('change status');
          await onlineModel.findOneAndUpdate({ token: pureToken }, { $set: { legal: false, removeTime: this.getTime() }});
        }
      }
      return false;
    }
  }

  static async tokenForceExpired(token) {
    const pureToken = token.split(' ')[1];

    try {
      await onlineModel.findOneAndUpdate({ token: pureToken }, { $set: { legal: false, removeTime: this.getTime() } });
    } catch (err) {
      console.error(err);
      return false;
    }

    return true;
  }
}