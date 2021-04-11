import { element, by, ElementFinder } from 'protractor';

export class CommercantComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-commercant div table .btn-danger'));
  title = element.all(by.css('jhi-commercant div h2#page-heading span')).first();
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

export class CommercantUpdatePage {
  pageTitle = element(by.id('jhi-commercant-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  adresseInput = element(by.id('field_adresse'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAdresseInput(adresse: string): Promise<void> {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput(): Promise<string> {
    return await this.adresseInput.getAttribute('value');
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

export class CommercantDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-commercant-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-commercant'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
