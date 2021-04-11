import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AutreCommerceComponentsPage, AutreCommerceDeleteDialog, AutreCommerceUpdatePage } from './autre-commerce.page-object';

const expect = chai.expect;

describe('AutreCommerce e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let autreCommerceComponentsPage: AutreCommerceComponentsPage;
  let autreCommerceUpdatePage: AutreCommerceUpdatePage;
  let autreCommerceDeleteDialog: AutreCommerceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AutreCommerces', async () => {
    await navBarPage.goToEntity('autre-commerce');
    autreCommerceComponentsPage = new AutreCommerceComponentsPage();
    await browser.wait(ec.visibilityOf(autreCommerceComponentsPage.title), 5000);
    expect(await autreCommerceComponentsPage.getTitle()).to.eq('coopcycleApp.autreCommerce.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(autreCommerceComponentsPage.entities), ec.visibilityOf(autreCommerceComponentsPage.noResult)),
      1000
    );
  });

  it('should load create AutreCommerce page', async () => {
    await autreCommerceComponentsPage.clickOnCreateButton();
    autreCommerceUpdatePage = new AutreCommerceUpdatePage();
    expect(await autreCommerceUpdatePage.getPageTitle()).to.eq('coopcycleApp.autreCommerce.home.createOrEditLabel');
    await autreCommerceUpdatePage.cancel();
  });

  it('should create and save AutreCommerces', async () => {
    const nbButtonsBeforeCreate = await autreCommerceComponentsPage.countDeleteButtons();

    await autreCommerceComponentsPage.clickOnCreateButton();

    await promise.all([autreCommerceUpdatePage.setTypeCommerceInput('typeCommerce')]);

    expect(await autreCommerceUpdatePage.getTypeCommerceInput()).to.eq(
      'typeCommerce',
      'Expected TypeCommerce value to be equals to typeCommerce'
    );

    await autreCommerceUpdatePage.save();
    expect(await autreCommerceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await autreCommerceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AutreCommerce', async () => {
    const nbButtonsBeforeDelete = await autreCommerceComponentsPage.countDeleteButtons();
    await autreCommerceComponentsPage.clickOnLastDeleteButton();

    autreCommerceDeleteDialog = new AutreCommerceDeleteDialog();
    expect(await autreCommerceDeleteDialog.getDialogTitle()).to.eq('coopcycleApp.autreCommerce.delete.question');
    await autreCommerceDeleteDialog.clickOnConfirmButton();

    expect(await autreCommerceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
