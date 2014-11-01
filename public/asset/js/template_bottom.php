<!-- Modal de busquedaa-->
                  <div class="modal fade" id="myModalSearch" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                          <h4 class="modal-title" id="myModalLabel">Search results</h4>
                        </div>
                        <div class="modal-body" id="mySearch-body">

                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>

<!-- Modal de mails-->
                  <div class="modal fade" id="myModalMail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                          <h4 class="modal-title" id="myModalLabel">Messages</h4>
                        </div>
                        <div class="modal-body" id="myMess-body">

                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary" id="newmessage">New message</button>
                          <?php 
                            $mess = "postPmGen('pers_mens','".$log_username."','pmsubject2','pmtext2')"; 
                          ?>
                          <button type="button" class="btn btn-primary" id="sendnewmessage" style="display:none;" onclick=<?php echo  $mess ?>>Send</button>
                          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
<!-- Modal de settings-->
                  <div class="modal fade" id="myModalSettings" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                          <h4 class="modal-title" id="myModalLabel">Under construction</h4>
                        </div>
                        <div class="modal-body" id="mySett-body">
                          <img class="image_modal" src="img/undcons.jpg">
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
<!-- Modal de settings-->
                  <div class="modal fade" id="myModalSecurity" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                          <h4 class="modal-title" id="myModalLabel">Changing your password</h4>
                        </div>
                        <div class="modal-body" id="mySett-body">
                          <div class="row">
                            <h4>Insert your actual password that you want to change</h4>
                            <div class="form-group">
                              <div class="col-sm-12">
                                <input type="text" class="form-control" id="actualpass" name="actualpass" placeholder="Insert your actual password...">
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <h4>Insert your new password</h4>
                            <div class="form-group">
                              <div class="col-sm-12">
                                <input type="text" class="form-control" id="newpass" name="newpass" placeholder="Insert your new password...">
                              </div>
                            </div>
                          </div>
                          <div class="row">
                            <h4>Retype your new password</h4>
                            <div class="form-group">
                              <div class="col-sm-12">
                                <input type="text" class="form-control" id="newpass2" name="newpass2" placeholder="Re-insert your new password...">
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary" id="updatepass">Change Password</button>
                          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
<footer class="padding">
<div class="container text-center">
  <p>&copy; Company 2014</p>
</div>
</footer>