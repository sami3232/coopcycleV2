import { element, by, ElementFinder } from 'protractor';

export class ProduitComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-produit div table .btn-danger'));
  title = element.all(by.css('jhi-produit div h2#page-heading span')).first();
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

export class ProduitUpdatePage {
  pageTitle = element(by.id('jhi-produit-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  prixInput = element(by.id('field_prix'));
  descriptionInput = element(by.id('field_description'));

  commerceSelect = element(by.id('field_commerce'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setPrixInput(prix: string): Promise<void> {
    await this.prixInput.sendKeys(prix);
  }

  async getPrixInput(): Promise<string> {
    return await this.prixInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async commerceSelectLastOption(): Promise<void> {
    await this.commerceSelect.all(by.tagName('option')).last().click();
  }

  async commerceSelectOption(option: string): Promise<void> {
    await this.commerceSelect.sendKeys(option);
  }

  getCommerceSelect(): ElementFinder {
    return this.commerceSelect;
  }

  async getCommerceSelectedOption(): Promise<string> {
    return await this.commerceSelect.element(by.css('option:checked')).getText();
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

export class ProduitDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-produit-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-produit'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
