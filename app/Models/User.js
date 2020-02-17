'use strict';

const Model = use('Model');
const Hash = use('Hash');

/**
 *  @swagger
 *  definitions:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: uint
 *        username:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *      required:
 *        - username
 *        - email
 *        - password
 */
class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token');
  }
}

module.exports = User;
