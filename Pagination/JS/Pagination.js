﻿class UsPagination{
    static PaginationWithSearch(PO) {
        $("#" + PO.ContentID).hide();
        UsPagination.RPS(PO);
        UsPagination.SP(PO);       
        $("#" + PO.ContentID).show();
    }
    static RPS(PO) {
        $("#" + PO.ContentID + "PaginationNavBar").remove();
        $("#" + PO.ContentID).children().each(function (rev, element) {
            $(element).removeClass("ItmActive");
            $(element).removeClass("data-Index");
            $(element).removeClass("HdnPgItm");
        });
    }
    static SP(PO) {
        $("#" + PO.ContentID).attr("unselectable", "on");
        $("#" + PO.ContentID).attr("onselectstart", "return false");
        $("#" + PO.ContentID).attr("onmousedown", "return false");
        $("#" + PO.ContentID).addClass("Unselect");
        var searchId = PO.SearchBoxId;
            if (UsPagination.isNotNull(searchId)) {
                $("#" + searchId).attr("onkeyup", "UsPagination.PaginationWithSearch({ContentID:'" + PO.ContentID + "',ItemVisiblePerPage:" + PO.ItemVisiblePerPage + ",ItemsInPaginationNav:" + PO.ItemsInPaginationNav + ",SearchBoxId:'" + PO.SearchBoxId + "'},event)");
            var SearchText = $("#" + PO.SearchBoxId).val().toLowerCase().trim();
                if (UsPagination.isNotNull(SearchText)) {
                $("#" + PO.ContentID).children().each(function (rev, element) {
                    var Tags = $(element).attr("data-SearchTag");
                    if (UsPagination.isNotNull(Tags)) {
                        if (Tags.indexOf(SearchText) > -1) {
                            $(element).addClass("ItmActive");
                        }
                    }
                });
            }
                else {
                    $("#" + PO.ContentID).children().each(function (rev, element) {
                    $(element).addClass("ItmActive");
                });
            }
        }
        else {
            $("#" + PO.ContentID).children().each(function (rev, element) {
                $(element).addClass("ItmActive");
            });
        }
        UsPagination.Pagination({
            ContentID: PO.ContentID,
            ItemVisiblePerPage: PO.ItemVisiblePerPage,
            ItemsInPaginationNav: PO.ItemsInPaginationNav
        });
    }

    static Pagination(PO) {
        $("<div id=" + PO.ContentID + "PaginationNavBar" + " class=\"Unselect PGNdiv\" unselectable=\"on\" onselectstart=\"return false; \" onmousedown=\"return false;\"><div>").insertAfter("#" + PO.ContentID);
        var ItemVisiblePerPage = PO.ItemVisiblePerPage;
        var UNOIIVIPN = PO.ItemsInPaginationNav;
        var ANOISIN = 0;
        var ANOIS = 0;
        var NOIIPNN = 0;
        var NumberOfItems = $("#" + PO.ContentID).children(".ItmActive").length;
        if (ItemVisiblePerPage < NumberOfItems) {
            ANOIS = ItemVisiblePerPage;
            NOIIPNN = Math.ceil(NumberOfItems / ItemVisiblePerPage);
        }
        else {
            ANOIS = NumberOfItems;
            NOIIPNN = 1;
        }
        if (UNOIIVIPN > NOIIPNN) {
            ANOISIN = NOIIPNN;
        }
        else {
            ANOISIN = UNOIIVIPN;
        }
        $("#" + PO.ContentID).children().each(function (rev, element) {
            $(element).removeAttr("data-Index");
        });
        $("#" + PO.ContentID).children(".ItmActive").each(function (rev, element) {
            if (ANOIS < (rev + 1)) {
                $(element).addClass("HdnPgItm");
            }
            $(element).attr("data-Index", rev + 1);
        });
        $("#" + PO.ContentID).children(":not(.ItmActive)").each(function (rev, element) {
            $(element).addClass("HdnPgItm");
        });
        $("#" + PO.ContentID + "PaginationNavBar").empty();
        $("#" + PO.ContentID + "PaginationNavBar").append("<span class=\"DfltPgnBtn PgnBtnDsbld PgnPrevBtn\" onclick=\"UsPagination.PgnPreBtn(event," + NumberOfItems + "," + ANOIS + "," + NOIIPNN + "," + ANOISIN + ")\">" + "<" + "</span>");
        $("#" + PO.ContentID + "PaginationNavBar").append("<span data-Index=" + 1 + " onclick=\"UsPagination.ChangePage(event," + NumberOfItems + "," + ANOIS + "," + NOIIPNN + "," + ANOISIN + ")\" class=\"PgnActive PgnBtn\">" + 1 + "</span>");
        for (var i = 2; i <= NOIIPNN; i++) {
            if (i > ANOISIN) {
                $("#" + PO.ContentID + "PaginationNavBar").append("<span data-Index=" + i + " onclick=\"UsPagination.ChangePage(event," + NumberOfItems + "," + ANOIS + "," + NOIIPNN + "," + ANOISIN + ")\" class=\"HdnPgItm PgnBtn\">" + i + "</span>");
            }
            else {
                $("#" + PO.ContentID + "PaginationNavBar").append("<span data-Index=" + i + " onclick=\"UsPagination.ChangePage(event," + NumberOfItems + "," + ANOIS + "," + NOIIPNN + "," + ANOISIN + ")\" class=\"PgnBtn\">" + i + "</span>");
            }

        }
        if (NOIIPNN === 1) {
            $("#" + PO.ContentID + "PaginationNavBar").append("<span class=\"DfltPgnBtn PgnBtnDsbld PgnNxtBtn\" onclick=\"UsPagination.PgnNxtBtn(event," + NumberOfItems + "," + ANOIS + "," + NOIIPNN + "," + ANOISIN + ")\">" + ">" + "</span>");
        }
        else {
            $("#" + PO.ContentID + "PaginationNavBar").append("<span class=\"DfltPgnBtn PgnNxtBtn\" onclick=\"UsPagination.PgnNxtBtn(event," + NumberOfItems + "," + ANOIS + "," + NOIIPNN + "," + ANOISIN + ")\">" + ">" + "</span>");
        }
    }

    static ChangePage(event, TotalItem, TotalVisibleItem, TotalItemInNav, TotalVisibleItemInNav) {
        var Element = event.target;
        $(Element).siblings().removeClass("PgnActive");
        $(Element).addClass("PgnActive");
        var SelectedPage = $(Element).attr("data-Index");
        UsPagination.SetPageReadyFor(Element, SelectedPage, TotalVisibleItem, TotalItemInNav);
    }
    static SetPageReadyFor(Element, SelectedPage, TotalVisible, Total) {
        var From = (TotalVisible * (SelectedPage - 1)) + 1;
        var To = From + (TotalVisible - 1);
        $(Element).parent().prev().children().addClass("HdnPgItm");
        $(Element).parent().prev().children().each(function (index, element) {
            var ThisEle = parseInt($(element).attr("data-Index"));
            if (ThisEle <= To && ThisEle >= From) {
                $(this).removeClass("HdnPgItm");
            }
        });
        UsPagination.EnableOrDisableNextAndPrev(Element, SelectedPage, Total);
    }

    static PgnNxtBtn(event, TotalItem, TotalVisibleItem, TotalItemInNav, TotalVisibleItemInNav) {
        var Element = event.target;
        if (!$(Element).hasClass("PgnBtnDsbld")) {
            var Active = parseInt($(Element).siblings(".PgnActive").attr("data-Index"));
            var SelectedPage = Active + 1;
            $(Element).siblings().prev(".DfltPgnBtn").removeClass("PgnBtnDsbld");

            if ($(Element).siblings('[data-Index=' + SelectedPage + ']').hasClass("HdnPgItm")) {
                var From = SelectedPage;
                var To = SelectedPage + (TotalVisibleItemInNav - 1);
                UsPagination.SetNavBar(Element, From, To);
            }
            UsPagination.RefreshNav(Element, SelectedPage, TotalVisibleItem, TotalItemInNav);
        }
    }
    static PgnPreBtn(event, TotalItem, TotalVisibleItem, TotalItemInNav, TotalVisibleItemInNav) {
        var Element = event.target;
        if (!$(Element).hasClass("PgnBtnDsbld")) {
            var Active = parseInt($(Element).siblings(".PgnActive").attr("data-Index"));
            var SelectedPage = Active - 1;

            if ($(Element).siblings('[data-Index=' + SelectedPage + ']').hasClass("HdnPgItm")) {
                var From = 0;
                if (TotalVisibleItemInNav === 1) {
                    From = SelectedPage;
                }
                else {
                    From = SelectedPage - TotalVisibleItemInNav;
                }
                var To = SelectedPage;
                UsPagination.SetNavBar(Element, From, To);
            }
            UsPagination.RefreshNav(Element, SelectedPage, TotalVisibleItem, TotalItemInNav);
        }
    }

    static RefreshNav(Element, SelectedPage, TotalVisibleItem, TotalItemInNav) {
        $(Element).siblings().next(".DfltPgnBtn").removeClass("PgnBtnDsbld");
        $(Element).siblings().removeClass("PgnActive");
        $(Element).siblings('[data-Index=' + SelectedPage + ']').addClass("PgnActive");
        UsPagination.SetPageReadyFor(Element, SelectedPage, TotalVisibleItem, TotalItemInNav);
    }
    static SetNavBar(Element, From, To) {
        $(Element).parent().children('span:not(.DfltPgnBtn)').addClass("HdnPgItm");
        $(Element).parent().children('span:not(.DfltPgnBtn)').each(function (index, element) {
            if ((index + 1) <= To && (index + 1) >= From) {
                $(this).removeClass("HdnPgItm");
            }
        });
    }

    static EnableOrDisableNextAndPrev(Element, SelectedPage, Total) {
        if (parseInt(SelectedPage) === 1) {
            if ($(Element).siblings().prev(".DfltPgnBtn").length === 1) {
                $(Element).siblings().prev(".DfltPgnBtn").addClass("PgnBtnDsbld");
            }
            else {
                $(Element).prev(".DfltPgnBtn").addClass("PgnBtnDsbld");
            }
        }
        else {
            $(Element).siblings().prev(".DfltPgnBtn").removeClass("PgnBtnDsbld");
        }
        if (Total === parseInt(SelectedPage)) {
            if ($(Element).siblings().next(".DfltPgnBtn").length === 1) {
                $(Element).siblings().next(".DfltPgnBtn").addClass("PgnBtnDsbld");
            }
            else {
                $(Element).next(".DfltPgnBtn").addClass("PgnBtnDsbld");
            }
        }
        else {
            $(Element).siblings().next(".DfltPgnBtn").removeClass("PgnBtnDsbld");
        }
    }

    static isNotNull(searchId) {
        var IsErr = false;
        if (searchId !== undefined && searchId !== null && searchId !== "") {
            IsErr = true;
        }
        else {
            IsErr = false;
        }
        return IsErr;
    }
}
