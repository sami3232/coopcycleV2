import { element, by, ElementFinder } from 'protractor';

export class UtilisateurComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-utilisateur div table .btn-danger'));
  title = element.all(by.css('jhi-utilisateur div h2#page-heading span')).first();
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

export class UtilisateurUpdatePage {
  pageTitle = element(by.id('jhi-utilisateur-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  firstnameInput = element(by.id('field_firstname'));
  mailInput = element(by.id('field_mail'));
  telInput = element(by.id('field_tel'));

  clientSelect = element(by.id('field_client'));
  commercantSelect = element(by.id('field_commercant'));
  coursierSelect = element(by.id('field_coursier'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setFirstnameInput(firstname: string): Promise<void> {
    await this.firstnameInput.sendKeys(firstname);
  }

  async getFirstnameInput(): Promise<string> {
    return await this.firstnameInput.getAttribute('value');
  }

  async setMailInput(mail: string): Promise<void> {
    await this.mailInput.sendKeys(mail);
  }

  async getMailInput(): Promise<string> {
    return await this.mailInput.getAttribute('value');
  }

  async setTelInput(tel: string): Promise<void> {
    await this.telInput.sendKeys(tel);
  }

  async getTelInput(): Promise<string> {
    return await this.telInput.getAttribute('value');
  }

  async clientSelectLastOption(): Promise<void> {
    await this.clientSelect.all(by.tagName('option')).last().click();
  }

  async clientSelectOption(option: string): Promise<void> {
    await this.clientSelect.sendKeys(option);
  }

  getClientSelect(): ElementFinder {
    return this.clientSelect;
  }

  async getClientSelectedOption(): Promise<string> {
    return await this.clientSelect.element(by.css('option:checked')).getText();
  }

  async commercantSelectLastOption(): Promise<void> {
    await this.commercantSelect.all(by.tagName('option')).last().click();
  }

  async commercantSelectOption(option: string): Promise<void> {
    await this.commercantSelect.sendKeys(option);
  }

  getCommercantSelect(): ElementFinder {
    return this.commercantSelect;
  }

  async getCommercantSelectedOption(): Promise<string> {
    return await this.commercantSelect.element(by.css('option:checked')).getText();
  }

  async coursierSelectLastOption(): Promise<void> {
    await this.coursierSelect.all(by.tagName('option')).last().click();
  }

  async coursierSelectOption(option: string): Promise<void> {
    await this.coursierSelect.sendKeys(option);
  }

  getCoursierSelect(): ElementFinder {
    return this.coursierSelect;
  }

  async getCoursierSelectedOption(): Promise<string> {
    return await this.coursierSelect.element(by.css('option:checked')).getText();
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

export class UtilisateurDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-utilisateur-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-utilisateur'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
