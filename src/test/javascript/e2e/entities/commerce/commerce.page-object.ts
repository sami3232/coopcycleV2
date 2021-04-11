import { element, by, ElementFinder } from 'protractor';

export class CommerceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-commerce div table .btn-danger'));
  title = element.all(by.css('jhi-commerce div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class CommerceUpdatePage {
  pageTitle = element(by.id('jhi-commerce-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  adresseInput = element(by.id('field_adresse'));
  nameInput = element(by.id('field_name'));
  noteCommerceInput = element(by.id('field_noteCommerce'));

  utilisateurSelect = element(by.id('field_utilisateur'));
  restaurantSelect = element(by.id('field_restaurant'));
  autreCommerceSelect = element(by.id('field_autreCommerce'));
  panierSelect = element(by.id('field_panier'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAdresseInput(adresse: string): Promise<void> {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput(): Promise<string> {
    return await this.adresseInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setNoteCommerceInput(noteCommerce: string): Promise<void> {
    await this.noteCommerceInput.sendKeys(noteCommerce);
  }

  async getNoteCommerceInput(): Promise<string> {
    return await this.noteCommerceInput.getAttribute('value');
  }

  async utilisateurSelectLastOption(): Promise<void> {
    await this.utilisateurSelect.all(by.tagName('option')).last().click();
  }

  async utilisateurSelectOption(option: string): Promise<void> {
    await this.utilisateurSelect.sendKeys(option);
  }

  getUtilisateurSelect(): ElementFinder {
    return this.utilisateurSelect;
  }

  async getUtilisateurSelectedOption(): Promise<string> {
    return await this.utilisateurSelect.element(by.css('option:checked')).getText();
  }

  async restaurantSelectLastOption(): Promise<void> {
    await this.restaurantSelect.all(by.tagName('option')).last().click();
  }

  async restaurantSelectOption(option: string): Promise<void> {
    await this.restaurantSelect.sendKeys(option);
  }

  getRestaurantSelect(): ElementFinder {
    return this.restaurantSelect;
  }

  async getRestaurantSelectedOption(): Promise<string> {
    return await this.restaurantSelect.element(by.css('option:checked')).getText();
  }

  async autreCommerceSelectLastOption(): Promise<void> {
    await this.autreCommerceSelect.all(by.tagName('option')).last().click();
  }

  async autreCommerceSelectOption(option: string): Promise<void> {
    await this.autreCommerceSelect.sendKeys(option);
  }

  getAutreCommerceSelect(): ElementFinder {
    return this.autreCommerceSelect;
  }

  async getAutreCommerceSelectedOption(): Promise<string> {
    return await this.autreCommerceSelect.element(by.css('option:checked')).getText();
  }

  async panierSelectLastOption(): Promise<void> {
    await this.panierSelect.all(by.tagName('option')).last().click();
  }

  async panierSelectOption(option: string): Promise<void> {
    await this.panierSelect.sendKeys(option);
  }

  getPanierSelect(): ElementFinder {
    return this.panierSelect;
  }

  async getPanierSelectedOption(): Promise<string> {
    return await this.panierSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class CommerceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-commerce-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-commerce'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
