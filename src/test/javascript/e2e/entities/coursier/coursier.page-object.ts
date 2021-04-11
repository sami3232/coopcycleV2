import { element, by, ElementFinder } from 'protractor';

export class CoursierComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-coursier div table .btn-danger'));
  title = element.all(by.css('jhi-coursier div h2#page-heading span')).first();
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

export class CoursierUpdatePage {
  pageTitle = element(by.id('jhi-coursier-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  coordonneInput = element(by.id('field_coordonne'));
  noteCoursierInput = element(by.id('field_noteCoursier'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCoordonneInput(coordonne: string): Promise<void> {
    await this.coordonneInput.sendKeys(coordonne);
  }

  async getCoordonneInput(): Promise<string> {
    return await this.coordonneInput.getAttribute('value');
  }

  async setNoteCoursierInput(noteCoursier: string): Promise<void> {
    await this.noteCoursierInput.sendKeys(noteCoursier);
  }

  async getNoteCoursierInput(): Promise<string> {
    return await this.noteCoursierInput.getAttribute('value');
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

export class CoursierDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-coursier-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-coursier'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
