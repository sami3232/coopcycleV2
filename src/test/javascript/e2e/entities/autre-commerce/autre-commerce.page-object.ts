import { element, by, ElementFinder } from 'protractor';

export class AutreCommerceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-autre-commerce div table .btn-danger'));
  title = element.all(by.css('jhi-autre-commerce div h2#page-heading span')).first();
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

export class AutreCommerceUpdatePage {
  pageTitle = element(by.id('jhi-autre-commerce-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  typeCommerceInput = element(by.id('field_typeCommerce'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTypeCommerceInput(typeCommerce: string): Promise<void> {
    await this.typeCommerceInput.sendKeys(typeCommerce);
  }

  async getTypeCommerceInput(): Promise<string> {
    return await this.typeCommerceInput.getAttribute('value');
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

export class AutreCommerceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-autreCommerce-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-autreCommerce'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
